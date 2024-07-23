from flask import Flask, request, jsonify, render_template
import subprocess
import re

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def parse_nmap_output(output, include_details=False):
    result = []
    details = {}
    lines = output.split('\n')
    for line in lines:
        match = re.search(r'(\d+/[a-z]+)\s+(\S+)\s+(\S+)', line)
        if match:
            port = match.group(1)
            state = match.group(2)
            service = match.group(3)
            result.append({'port': port, 'state': state, 'service': service})
        if include_details:
            if "OS details" in line:
                details['os_details'] = line.split(':', 1)[1].strip()
            if "Running" in line:
                details['running'] = line.split(':', 1)[1].strip()
            if "Service Info" in line:
                details['service_info'] = line.split(':', 1)[1].strip()
    return result, details

def get_ip_from_domain(domain):
    try:
        command = f"dig +short {domain}"
        result = subprocess.run(command.split(), capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return str(e)

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    if not data or 'target' not in data or 'options' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    target = data['target']
    options = ' '.join(data['options'])
    
    include_details = '-A' in options or '-O' in options or '-sV' in options

    if target and not re.match(r'^\d{1,3}(\.\d{1,3}){3}$', target):
        ip_address = get_ip_from_domain(target)
    else:
        ip_address = None

    try:
        command = f"nmap {options} {target}"
        result = subprocess.run(command.split(), capture_output=True, text=True)
        if result.returncode == 0:
            parsed_result, details = parse_nmap_output(result.stdout, include_details)
            return jsonify({'result': parsed_result, 'details': details, 'ip_address': ip_address})
        else:
            return jsonify({'error': result.stderr}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


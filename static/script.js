document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('scan-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const input = document.getElementById('input').value;
        const options = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(checkbox => checkbox.value);

        document.getElementById('loading').style.display = 'block';

        fetch('/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target: input, options: options })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';

            const resultDiv = document.getElementById('ports');
            resultDiv.innerHTML = '';  
            data.result.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'port-entry';
                entryDiv.innerHTML = `
                    <span class="port">${entry.port}</span>
                    <span class="state">${entry.state}</span>
                    <span class="service">${entry.service}</span>
                `;
                resultDiv.appendChild(entryDiv);
            });

            const nmapSyntaxDiv = document.getElementById('nmap-syntax');
            nmapSyntaxDiv.innerText = `nmap ${options.join(' ')} ${input}`;

            if (data.ip_address) {
                const ipAddressDiv = document.getElementById('ip-address');
                ipAddressDiv.innerText = `IP Address: ${data.ip_address}`;
            }

            if (data.details) {
                const detailsDiv = document.getElementById('details');
                detailsDiv.innerHTML = '';  
                const detailsBox = document.createElement('div');
                detailsBox.className = 'details-box';
                detailsBox.innerHTML = `
                    <h3>Additional Details:</h3>
                    ${data.details.os_details ? `<p>OS Details: ${data.details.os_details}</p>` : ''}
                    ${data.details.running ? `<p>Running: ${data.details.running}</p>` : ''}
                    ${data.details.service_info ? `<p>Service Info: ${data.details.service_info}</p>` : ''}
                `;
                detailsDiv.appendChild(detailsBox);
            }
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            console.error('Error:', error);
        });
    });

});

# Shunmap Web Scanner

Shunmap Web Scanner is a web-based tool for performing Nmap scans. It allows users to enter a target URL or IP address, select various scan options, and view the results directly in the browser. The tool is optimized for both desktop and mobile use.

## Features

- Display scan results including port, state, and service.
- Show Nmap syntax and IP address of target in a boxed format.
- Additional details for aggressive, OS detection, and version detection scans.

## Getting Started

### Prerequisites

- Python 3.x
- Flask
- Nmap

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/H3LLKY4T/shunmap.git
   cd shunmap
pip install requirements:

```
pip install flask
```
Running the Application
Start the Flask server:
```
python3 app.py
```
Open your browser and navigate to http://localhost:5000.

## Using the Tool
- Enter the target URL or IP address in the input box.
- Select the desired scan options using the toggle switches.
- Click the "Scan" button.
- View the scan results, Nmap syntax, and IP address in the respective boxes.
  
### Project Structure
- app.py: The Flask application file that handles routes and the Nmap scan logic.
- templates/index.html: The main HTML file for the web interface.
- static/css/styles.css: The CSS file for styling the web interface.
- static/js/main.js: The JavaScript file for handling form submission and UI interactions.

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the GNU License. See the LICENSE file for details.



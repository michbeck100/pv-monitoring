# PV Monitoring
Contains configuration and Grafana dashboard for monitoring PV inverters

![image](https://user-images.githubusercontent.com/5385572/173031897-37c5142d-9833-498f-9164-3ff7561b8e31.png)

## Supported inverters
Since the setup is using SunGather to read the modbus registers, currently only Sungrow Inverters are supported. See the list on the projects website: https://sungather.app

## Setup 
You must set your inverters ip address at [sungather/config.yaml](https://github.com/michbeck100/pv-monitoring/blob/main/sungather/config.yaml). For additional configuration of SunGather please see the project website.

## PV Forecasts
This monitoring solution also supports PV forecasts from [Solcast](https://toolkit.solcast.com.au/live-forecast). To use it, create an account and replace `<ENTER_YOUR_SITE_RESOURCE_ID_HERE>` with your own site resource id and enter your API Token in Node-Red (should be at http://localhost:1880).

Example:
![image](https://user-images.githubusercontent.com/5385572/173027877-88590e77-4d7d-4860-8444-885d2dd433eb.png)


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [SunGather](https://github.com/bohdan-s/SunGather)
* [Umfangreiches Logging mit Grafana (+Anleitung)](https://www.photovoltaikforum.com/thread/150542-umfangreiches-logging-mit-grafana-anleitung/)
* [Sungrow WR SGH10RT erfolgreich mit MODBUS eingebunden](https://forum.iobroker.net/topic/38441/sungrow-wr-sgh10rt-erfolgreich-mit-modbus-eingebunden)

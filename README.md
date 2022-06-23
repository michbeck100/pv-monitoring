# PV Monitoring
Contains configuration and Grafana dashboard for monitoring PV inverters

![image](https://user-images.githubusercontent.com/5385572/173031897-37c5142d-9833-498f-9164-3ff7561b8e31.png)

## Tools

This setup uses 
- [Grafana](https://grafana.com) (for visualization)
- [grafana-image-renderer](https://grafana.com/grafana/plugins/grafana-image-renderer/) (to render screenshots for alerts)
- [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) (time series database) 
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) (reads from mqtt and writes to influx)
- [Node-RED](https://nodered.org) (processes pv forecast data)
- [SunGather](https://sungather.app) (collects data from inverters using Modbus)
- [Mosquitto](https://mosquitto.org) (MQTT broker)
- [evcc](https://evcc.io) (controls EV charger)

## Supported inverters
Since the setup is using SunGather to read the modbus registers, currently only Sungrow Inverters are supported. See the list on the projects website: https://sungather.app

## Setup
### Grafana 
The default credentials for Grafana after first start are admin:admin. You can change the password after login.

The dashboard uses different variables for calculating your costs and savings:
- `strompreis`: your current grid price
- `verguetung`: rate for feeding excess (pv) energy to the grid (german: Einspeisevergütung)

To enable seding alerts via email you must configure your SMTP provider in the environment variables starting with `GF_SMTP_` in [docker-compose.yml](https://github.com/michbeck100/pv-monitoring/blob/main/docker-compose.yml)

The current setup assumes that it's running on an ARM based architecture. If you are using x86 hardware, make sure to use the official image as described [here](https://github.com/grafana/grafana-image-renderer#run-in-docker).

### SunGather
You must set your inverters ip address at [sungather/config.yaml](https://github.com/michbeck100/pv-monitoring/blob/main/sungather/config.yaml). For additional configuration of SunGather please see the project website.

### evcc
evcc is configured to get the inverter data by mqtt. So there is no change needed. 

But you must setup your wallbox according to https://docs.evcc.io/docs/devices/chargers in [evcc/evcc.yaml](https://github.com/michbeck100/pv-monitoring/blob/main/evcc/evcc.yaml).

## PV Forecasts
This monitoring solution also supports PV forecasts from [Solcast](https://toolkit.solcast.com.au/live-forecast). To use it, create an account and replace `<ENTER_YOUR_SITE_RESOURCE_ID_HERE>` with your own site resource id and enter your API Token in Node-Red (should be at http://localhost:1880).

Example:
![image](https://user-images.githubusercontent.com/5385572/173027877-88590e77-4d7d-4860-8444-885d2dd433eb.png)

## Traefik
This setup adds labels to every container with a ui for [traefik](https://doc.traefik.io/traefik/). You only have to set your preferred host name in `traefik.http.routers.<CONTAINER>.rule=Host` in [docker-compose.yml](https://github.com/michbeck100/pv-monitoring/blob/main/docker-compose.yml).

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [SunGather](https://github.com/bohdan-s/SunGather)
* [Umfangreiches Logging mit Grafana (+Anleitung)](https://www.photovoltaikforum.com/thread/150542-umfangreiches-logging-mit-grafana-anleitung/)
* [Sungrow WR SGH10RT erfolgreich mit MODBUS eingebunden](https://forum.iobroker.net/topic/38441/sungrow-wr-sgh10rt-erfolgreich-mit-modbus-eingebunden)

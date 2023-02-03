# PV Monitoring
Contains configuration and Grafana dashboard for monitoring PV inverters

![image](https://user-images.githubusercontent.com/5385572/173031897-37c5142d-9833-498f-9164-3ff7561b8e31.png)

## Tools

This setup uses 
- [Grafana](https://grafana.com) (for visualization)
- [grafana-image-renderer](https://grafana.com/grafana/plugins/grafana-image-renderer/) (to render screenshots for alerts)
- [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) (time series database) 
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) (reads from mqtt and writes to influx)
- [PVForecast](https://github.com/michbeck100/PVForecast) (processes pv forecast data from solcast)
- [SunGather](https://sungather.app) (collects data from inverters using Modbus)
- [Mosquitto](https://mosquitto.org) (MQTT broker)
- [evcc](https://evcc.io) (controls EV charger)

## Supported inverters
Since the setup is using SunGather to read the modbus registers, currently only Sungrow Inverters are supported. See the list on the projects website: https://sungather.app

## Setup
### .env

Copy `.env-sample` to `.env` and modify the variables before running docker compose.

### Grafana 
The default credentials for Grafana after first start are admin:admin. You can change the password after login.

The dashboard uses different variables for calculating your costs and savings:
- `strompreis`: your current grid price
- `verguetung`: rate for feeding excess (pv) energy to the grid (german: Einspeisevergütung)

The current setup assumes that it's running on an ARM based architecture. If you are using x86 hardware, make sure to use the official image as described [here](https://github.com/grafana/grafana-image-renderer#run-in-docker).

### SunGather
You must set your inverters ip address at [sungather/config.yaml](sungather%2Fconfig.yaml). For additional configuration of SunGather please see the project website.

### evcc
evcc is configured to get the inverter data by mqtt. So there is no change needed. 

But you must setup your wallbox according to https://docs.evcc.io/docs/devices/chargers in [evcc/evcc.yaml](evcc%2Fevcc.yaml).

## PV Forecasts
This monitoring solution also supports PV forecasts from [Solcast](https://toolkit.solcast.com.au/live-forecast). To use it, create an account and update [config.ini](pvforecast%2Fconfig.ini) with your own site resource ids and API token.

## Traefik
This setup adds labels to every container with a ui for [traefik](https://doc.traefik.io/traefik/). You only have to set your preferred host name in `traefik.http.routers.<CONTAINER>.rule=Host` in [docker-compose.yml](docker-compose.yml).

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [SunGather](https://github.com/bohdan-s/SunGather)
* [Umfangreiches Logging mit Grafana (+Anleitung)](https://www.photovoltaikforum.com/thread/150542-umfangreiches-logging-mit-grafana-anleitung/)
* [Sungrow WR SGH10RT erfolgreich mit MODBUS eingebunden](https://forum.iobroker.net/topic/38441/sungrow-wr-sgh10rt-erfolgreich-mit-modbus-eingebunden)

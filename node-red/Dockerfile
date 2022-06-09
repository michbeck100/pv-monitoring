FROM nodered/node-red

COPY package.json /data
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production --prefix /usr/src/node-red -g /data

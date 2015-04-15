### Install patches for port changed
### assume you have download patches from github
#  git clone https://github.com/KevinHuang/1knowPortChanged.git  /opt/1knowPortChanged

cd /opt/1knowPortChanged

cp welcome.js  /opt/1know_standalone/public/js/welcome.js
cp knowledge.html.erb  /opt/1know_standalone/app/views/page/knowledge.html.erb
cp group.html.erb  /opt/1know_standalone/app/views/page/group.html.erb
cp channel.html.erb  /opt/1know_standalone/app/views/page/channel.html.erb
cp watch.html.erb  /opt/1know_standalone/app/views/main/watch.html.erb
cp index.html  /opt/1know_standalone/app/views/chooser/index.html
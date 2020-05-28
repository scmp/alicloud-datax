#!/bin/sh -e

# update && install require packages
apk update
apk upgrade
apk add --no-cache wget openjdk8-jre python nodejs npm

wget http://datax-opensource.oss-cn-hangzhou.aliyuncs.com/datax.tar.gz
tar -zxvf datax.tar.gz
mv datax /opt/
rm datax.tar.gz

apk del wget

npm config set unsafe-perm true
npm install -g npm@latest

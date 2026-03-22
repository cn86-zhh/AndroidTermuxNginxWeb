#!/bin/bash

if ! /bin/cp -rpf /e/tmp/web/android/* /e/web/AndroidTermuxNginxWeb/; then
    echo -e "copy failed"
else
    echo -e "copy success"
fi

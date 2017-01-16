#!/bin/bash

cd /var/backups/mysql_databases/

HOST="10.0.0.1"
USER="backupuser"
PASS="iezaakeXiecheik1yaeSheish4see5Xi"

DATE_TODAY=$(date +"%Y-%m-%d")

# dump it
mysqldump -h $HOST -u $USER -p$PASS --all-databases > db_$DATE_TODAY.sql

# compress!
gzip -5 -f db_$DATE_TODAY.sql

# delete files that are older than 30 days
find . -mtime +30 -type f -delete
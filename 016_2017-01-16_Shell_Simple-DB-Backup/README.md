# #016 2017-01-16: Simple DB Backup

Currently in use on one of my test servers. But have also a modified version running on my MacBook, if things go terribly wrong. So instead `-mtime +30` I use `-mmin +4320` (3 days) and extented the `DATE_TODAY` variable. So I have now always a backup of at least 3 days (every 15 minutes) of my MacBook saved on my NAS. (Of cause only if my MacBook is connected to my home network).

**Demo:** <https://codebrauer.github.io/100daysofcode/016_2017-01-16_Shell_Simple-DB-Backup/>
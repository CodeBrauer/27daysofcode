# #010 2017-01-10: ShellNotify

Pipe any output from the shell to my smartphone with the Pushbullet API. If you want to use it for yourself you just need to 
set the `$config['access_token']`.

You can get the token [here](https://www.pushbullet.com/#settings/account).


**Demo:**

![demo](https://cloud.githubusercontent.com/assets/2059754/21824272/e234c63e-d77e-11e6-8dce-fdf4a537eb57.gif)

**Installation for **

- Copy notify.php to `/usr/local/bin/` and rename it maybe `notify`
- (If you haven't done this yet) - Add `/usr/local/bin/` to your $PATH

**TL;DR**

```bash
sudo mkdir -p /usr/local/bin/
cp notify.php /usr/local/bin/notify
chmod u+x /usr/local/bin/notify

#if not done yet:
echo "PATH=\$PATH:/usr/local/bin" >> ~/.bashrc && source ~/.bashrc
```

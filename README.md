# Node Multi App Proxy

Nodejs script to run multiple apps while exposing a single port. (Mimicing proxy action)

Helpful when running applications on **Heroku**.

## Apps
Apps are application running on some port. These can be started with a command if needed.

### App Configuration
```
path: Exposed path
command: Command to run on startup (Optional)
target: Redirect to
changeOrigin: For name-based virtual hosted sites (Bool)
pathRewrite: Edit the path when using proxy.
```


## Global Configuration
Create a `config.json` file in the same folder as `main.js`.

```
port: Exposed common port
apps: App[]
```

See the [config.json](./config.json) for example.
# **Shiu**

Shiu is an open-source, standardized utility designed to simplify the management of sensitive secrets in applications and environments. It allows you to securely inject secrets from multiple sources into your codebase, reducing the risk of hardcoding sensitive data.

**Key Features:**

- **Multi-Source Support**: Shiu currently supports two popular secret storage solutions:
  - AWS Secret Manager (SSM)
  - Environment variables via `.env` files
- **Standardized Interface**: A simple, intuitive API for integrating secrets into your applications.
- **Decoupling Security and Code**: By separating the management of sensitive data from your application's code, Shiu helps minimize the risk of security breaches.

## **Installation**

To use Shiu, run the following command in your project's root directory:

```bash
npm install shiu
```

## **Initialization and Configuration**

Shiu can be configured with a config file with smart type completion support. To create a empty config file use the cli init script.

```bash
npx shiu init --providers=ssm,dotenv [--config=shiu.config.js]
```

## **Usage**

### Injecting

Shiu provides a cli and a simple API options for injecting secrets into your application.

#### Cli usage

Cli injection can be done calling exec script with the cmd to be executed. Ex:

```bash
npx shiu exec [--config=shiu-config.js] -- node index.js
```

- **--config** is optional and defaults to **shiu-config.js**.

#### Application usage

To inject secrets simply import the inject function from 'shiu' and execute it to bootstrap the application. Ex:

### Pulling secrets

To pull secrets to a dotenv file use the cli script pull. Ex:

```bash
shiu pull [--outfile={{.env_path}}]
```

- **--outfile** is optional and defaults to **.env**.

## **Contributing**

We welcome pull requests from the community!

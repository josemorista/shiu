# **Psiu: Personal Secret Injector Utility**

Psiu is an open-source, standardized utility designed to simplify the management of sensitive secrets in applications and environments. It allows you to securely inject secrets from multiple sources into your codebase, reducing the risk of hardcoding sensitive data.

**Key Features:**

- **Multi-Source Support**: Psiu currently supports two popular secret storage solutions:
  - AWS Secret Manager (SSM)
  - Environment variables via `.env` files
- **Standardized Interface**: A simple, intuitive API for integrating secrets into your applications.
- **Decoupling Security and Code**: By separating the management of sensitive data from your application's code, Psiu helps minimize the risk of security breaches.

## **Installation**

To use Psiu, run the following command in your project's root directory:

```bash
npm install psiu
```

## **Initialization and Configuration**

Psiu can be configured with a config file with smart type completion support. To create a empty config file use the cli init script.

```bash
npx psiu init --providers=ssm,dotenv [--config=psiu.config.js]
```

## **Usage**

### Injecting

Psiu provides a cli and a simple API options for injecting secrets into your application.

#### Cli usage

Cli injection can be done calling exec script with the cmd to be executed. Ex:

```bash
npx psiu exec [--config=psiu-config.js] -- node index.js
```

- **--config** is optional and defaults to **psiu-config.js**.

#### Application usage

To inject secrets simply import the inject function from 'psiu' and execute it to bootstrap the application. Ex:

### Pulling secrets

To pull secrets to a dotenv file use the cli script pull. Ex:

```bash
psiu pull [--outfile={{.env_path}}]
```

- **--outfile** is optional and defaults to **.env**.

## **Contributing**

We welcome pull requests from the community!

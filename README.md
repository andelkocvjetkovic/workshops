# Workshops

Overview of Workshops Architecture

## Frontend

### Development Framework

Workshops is using custom-built pipeline around React.js as development framework.

#### Local development

**Development**

- Run `yarn run dev` to start dev servers
- Frontend
    - http://localhost:3000/
- Backend Resources
    - http://localhost:4000
    - http://localhost:4000/users
    - http://localhost:4000/workshops
    - http://localhost:4000/orders
    - http://localhost:4000/categories

---

## prettier

- use `yarn run pretty` to see the codebase inconsistencies
- use `yarn run pretty:fix` to let prettier automatically fix inconsistencies

## eslint

- use `yarn run lint` to see the codebase inconsistencies
- use `yarn run lint:fix` to let eslint automatically fix inconsistencies

## prettier & eslint fix

- use `yarn run fix` to let prettier & eslint automatically fix inconsistencies

#### Development Stack

- [ReactJs](https://reactjs.org/) (JavaScript ES6+)
- [React-Bootstrap](https://mui.com/) (with React-MaterialUI)
- [JSON-Server](https://github.com/typicode/json-server) (JSON-Server)
- Bundled with Vite. See the section about [configuration](https://vitejs.dev) for more information.

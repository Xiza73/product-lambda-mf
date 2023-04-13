# Product API

API construida utilizando tecnologías serverless en AWS, utilizando también Amazon API Gateway para proporcionar endpoints RESTful, y las funciones Lambda de AWS. A través de esta API, podemos interactuar con nuestra base de datos MongoDB para listar productos y categorías, filtrar productos por categoría y registrar nuevos productos.

---

## Autenticación

Para las pruebas de la API, debe usar el siguiente token de autenticación:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ._J0_tigqt3P-kmV3chTLFSJWax5LdzTDzf80TSguBY4
```

El cual irá como cabecera en cada petición y con el nombre `connection-token`.

---

## Endpoints

### GET /products

Obtiene todos los productos de la base de datos.

```
GET - https://rxuxnijpfd.execute-api.us-west-2.amazonaws.com/dev/products
```

**Parámetros de consulta:**

- `category`: (opcional) Filtra los productos por categoría.

**Ejemplo de solicitud:**

```
GET - https://rxuxnijpfd.execute-api.us-west-2.amazonaws.com/dev/products?category=Tecnología
```

Encabezados:

```
connection-token: {token}
```

**Ejemplo de respuesta:**

```json
[
  {
    "_id": "64378300a33e69cdb3f7e73d",
    "name": "Mouse",
    "description": "Mouse inalámbrico",
    "price": 130,
    "imageUrl": "",
    "createdAt": "2023-04-13T04:20:16.682Z",
    "updatedAt": "2023-04-13T04:20:16.682Z",
    "categories": [
      {
        "_id": "643735412504450008ada96e",
        "name": "Tecnología",
        "description": "Artículos de tecnología",
        "createdAt": "2023-04-12T22:48:32.960Z",
        "updatedAt": "2023-04-12T22:48:32.960Z"
      }
    ]
  },
  {
    "_id": "64379525db3c9124c7ae1b01",
    "name": "Falopa",
    "description": "No sé que es una falopa",
    "price": 50,
    "imageUrl": "",
    "createdAt": "2023-04-13T05:37:40.874Z",
    "updatedAt": "2023-04-13T05:37:40.874Z",
    "categories": [
      {
        "_id": "643735412504450008ada96e",
        "name": "Tecnología",
        "description": "Artículos de tecnología",
        "createdAt": "2023-04-12T22:48:32.960Z",
        "updatedAt": "2023-04-12T22:48:32.960Z"
      },
      {
        "_id": "643794c9da07cae87e2b9cdd",
        "name": "Random",
        "description": "a random category",
        "createdAt": "2023-04-13T05:36:09.625Z",
        "updatedAt": "2023-04-13T05:36:09.625Z"
      }
    ]
  }
]
```

### POST /categories

Registra una nueva categoría en la base de datos.

```
POST - https://rxuxnijpfd.execute-api.us-west-2.amazonaws.com/dev/categories
```

Parámetros del cuerpo:

- `name`: (obligatorio) Nombre de la categoría.
- `description`: (obligatorio) Descripción de la categoría.

**Ejemplo de solicitud:**

```json
{
  "name": "Tecnología",
  "description": "Artículos de tecnología"
}
```

Encabezados:

```
connection-token: {token}
Content-Type: application/json
```

**Ejemplo de respuesta:**

```json
{
  "_id": "643735412504450008ada96e",
  "name": "Tecnología",
  "description": "Artículos de tecnología",
  "createdAt": "2023-04-12T22:48:32.960Z",
  "updatedAt": "2023-04-12T22:48:32.960Z"
}
```

### POST /products

Registra un nuevo producto en la base de datos.

```
POST - https://rxuxnijpfd.execute-api.us-west-2.amazonaws.com/dev/products
```

Parámetros del cuerpo:

- `name`: (obligatorio) Nombre del producto.
- `description`: (obligatorio) Descripción del producto.
- `price`: (obligatorio) Precio del producto.
- `imageUrl`: (opcional) URL de la imagen del producto.
- `categories`: (obligatorio) Arreglo de categorías a las que pertenece el producto.

**Ejemplo de solicitud:**

```json
{
  "name": "Mouse",
  "description": "Mouse inalámbrico",
  "price": 130,
  "imageUrl": "",
  "categories": ["Tecnología"]
}
```

Encabezados:

```
connection-token: {token}
Content-Type: application/json
```

**Ejemplo de respuesta:**

```json
{
  "_id": "64378300a33e69cdb3f7e73d",
  "name": "Mouse",
  "description": "Mouse inalámbrico",
  "price": 130,
  "imageUrl": "",
  "createdAt": "2023-04-13T04:20:16.682Z",
  "updatedAt": "2023-04-13T04:20:16.682Z",
  "categories": [
    {
      "_id": "643735412504450008ada96e",
      "name": "Tecnología",
      "description": "Artículos de tecnología",
      "createdAt": "2023-04-12T22:48:32.960Z",
      "updatedAt": "2023-04-12T22:48:32.960Z"
    }
  ]
}
```

---

## Categorías registradas

```js
[
  {
    _id: ObjectId("643735412504450008ada96e"),
    name: "Tecnología",
  },
  {
    _id: ObjectId("643794c9da07cae87e2b9cdd"),
    name: "Random",
  },
];
```

---

## Errores y códigos de estado comunes

### 400 Bad Request

El servidor no puede procesar la solicitud porque el cuerpo de la petición no es válido.

### 401 Unauthorized

El servidor no puede procesar la solicitud porque el token de conexión no es válido.

### 404 Not Found

El servidor no puede encontrar el recurso solicitado.

### 500 Internal Server Error

El servidor encontró una condición inesperada que impidió que se completara la solicitud.

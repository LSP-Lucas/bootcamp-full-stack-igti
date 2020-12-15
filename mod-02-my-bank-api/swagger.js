export const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "description": "My Bank API description",
    "version": "1.0.0",
    "title": "My Bank API description"
  },
  "host": "localhost:3000",
  "tags": [
    {
      "name": "account",
      "description": "Account management"
    }
  ],
  "paths": {
    "/account": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get existing accounts",
        "description": "Get existing acount description",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Account"
              }
            }
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      },
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Create a new account",
        "description": "Create a new account with the received parameters",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account created"
          },
          "404": {
            "description": "Error occured"
          }
        }
      },
      "put": {
        "tags": [
          "account"
        ],
        "summary": "Edit account",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/AccountEdit"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account edit"
          },
          "404": {
            "description": "Error occured"
          }
        }
      }
    },
    "/account/{id}": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get existing accounts",
        "description": "Get existing acount description",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of pet to return",
            "required": true,
            "type": "integer"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/AccountId"
              }
            }
          },
          "400": {
            "description": "Error ocurred"
          },
          "404": {
            "description": "Not found account"
          }
        }
      }
    }
  },
  "definitions": {
    "Account": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Lucas Pedroso"
        },
        "balance": {
          "type": "integer",
          "example": 7000.55
        }
      }
    },
    "AccountEdit": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 1
        },
        "name": {
          "type": "string",
          "example": "Lucas Pedroso"
        },
        "balance": {
          "type": "integer",
          "example": 7000.55
        }
      }
    },
    "AccountId": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 1
        },
        "name": {
          "type": "string",
          "example": "Lucas Pedroso"
        },
        "balance": {
          "type": "integer",
          "example": 7000.55
        }
      }
    }
  }
};
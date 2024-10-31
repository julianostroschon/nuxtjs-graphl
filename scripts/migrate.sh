#!/bin/bash

# Lista de clientes (datasources)
clients=("LOCALHOST" "CLIENTE1" "CLIENTE2") # Adicione mais clientes conforme necessário

# Itera sobre cada cliente e executa o prisma migrate deploy
for client in "${clients[@]}"; do
  export DATABASE_URL=$(printenv "DATABASE_URL_$client")
  
  if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL for $client not found. Skipping..."
    continue
  fi

  echo "Running migrations for $client..."
  npx prisma migrate deploy
done
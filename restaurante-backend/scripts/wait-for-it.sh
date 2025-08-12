#!/usr/bin/env bash
host="$1"
port="$2"
timeout="${3:-15}"

echo "Esperando a que $host:$port esté disponible..."

start_ts=$(date +%s)
while :
do
  if timeout 1 bash -c "cat < /dev/null > /dev/tcp/$host/$port" 2>/dev/null; then
    echo "$host:$port está disponible"
    break
  fi

  now_ts=$(date +%s)
  elapsed=$(( now_ts - start_ts ))

  echo "Esperando... $elapsed segundos transcurridos"

  if [ "$elapsed" -ge "$timeout" ]; then
    echo "Timeout tras $timeout segundos esperando $host:$port"
    exit 1
  fi

  sleep 1
done

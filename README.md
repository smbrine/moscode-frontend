# moscode-frontend
Frontend microservice for mxscxde.ru

    image: redis:latest
    command: redis-server --appendonly yes
    container_name: redis
    environment:
      REDIS_PORT: 6379
      REDIS_DATABASES: 16
      REDIS_REPLICATION_MODE: master
    volumes:
      - ${PV_LOC}/redis/data:/data
    restart: always
    ports:
      - "6379:6379"


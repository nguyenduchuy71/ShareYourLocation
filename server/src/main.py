import asyncio
import os
import signal
import sys
import json
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from router import authRouter, projectRouter
from db import database
from apitally.fastapi import ApitallyMiddleware
from dotenv import load_dotenv
from log.logger import logger
from confluent_kafka import Consumer, KafkaError
from kafka import KafkaConsumer
from jose import JWTError, jwt
from jose.exceptions import ExpiredSignatureError
from fastapi.responses import JSONResponse
from auth.config import SESSION_COOKIE_NAME
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from redis import asyncio as aioredis

@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    redis = aioredis.from_url("redis://redis")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    yield
PORT = int(os.getenv('PORT'))
load_dotenv()
app = FastAPI(lifespan=lifespan)
# consumer = KafkaConsumer('order_details', bootstrap_servers='localhost:29092')

# KAFKA_BROKER = 'localhost:9092'
# KAFKA_TOPIC = 'order_topic'
# CONSUMER_GROUP = 'group_1'

# consumer_conf = {
#     'bootstrap.servers': KAFKA_BROKER,
#     'group.id': CONSUMER_GROUP,
#     'auto.offset.reset': 'earliest'
# }
# consumer = Consumer(consumer_conf)


# APITALLY_KEY = os.getenv('APITALLY_KEY')
# app.add_middleware(
#     ApitallyMiddleware,
#     client_id="APITALLY_KEY",
#     env="dev",
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(authRouter.router)
app.include_router(projectRouter.router)

@app.on_event("startup")
async def start_consumer():
    logger.info("Startup the application")
    database.Base.metadata.create_all(bind=database.engine)
    
    # def consume_messages():
        # consumer.subscribe([KAFKA_TOPIC])
        # while True:
        #     msg = consumer.poll(1.0)
        #     if msg is None:
        #         continue
        #     if msg.error():
        #         if msg.error().code() == KafkaError._PARTITION_EOF:
        #             continue
        #         else:
        #             logger.error(f"Consumer error: {msg.error()}")
        #             break
        #     order_data = json.loads(msg.value().decode('utf-8'))
        #     logger.info(f"Received order: {order_data}")
        # while True:
        #     for message in consumer:
        #         logger.info("Here is a message..")
        #         logger.info(message)

    # loop = asyncio.get_event_loop()
    # loop.run_in_executor(None, consume_messages)

@app.on_event("shutdown")
def shutdown_event():
    logger.info("Shutting down the application")
    # consumer.close()

def signal_handler(sig, frame):
    logger.info("Received termination signal, shutting down gracefully...")

# Register signal handlers
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

@app.exception_handler(ExpiredSignatureError)
async def expired_token_handler(request: Request, exc: ExpiredSignatureError):
    return JSONResponse(
        status_code=401,
        content={"message": "Token has expired. Please log in again."},
    )

@app.get('/')
def root():
    return {'message': "Hello, welcome to server"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=PORT, reload=True, host='0.0.0.0')

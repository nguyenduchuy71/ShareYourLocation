import signal
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from jose.exceptions import ExpiredSignatureError
from redis import asyncio as aioredis

from db import database
from log.logger import logger
from routers import authRouter, projectRouter


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    redis = aioredis.from_url("redis://redis")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    yield

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

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get('/')
def root():
    return {'message': "Hello, welcome to server"}

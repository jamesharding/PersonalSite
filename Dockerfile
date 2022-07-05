FROM python:3.9
WORKDIR /code
COPY ./ /code
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
CMD ["gunicorn", "--conf", "gunicorn_conf.py", "--bind", "0.0.0.0:80", "startup:app"]
EXPOSE 80
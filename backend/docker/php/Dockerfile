FROM php:8-fpm

# we're removing the interactive environment in the docker container context.
ENV DEBIAN_FRONTEND noninteractive

# SYSTEM CORE INSTALLATION
RUN  apt-get update -y
RUN  apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    graphviz \
    zip

# Install the mainly dependencies.
RUN ACCEPT_EULA=Y apt-get install -y \
    unixodbc \
    unixodbc-dev \
    libgss3 \
    odbcinst


#  SET UP C++ ENGINE ENHANCEMENT
RUN ln -s /usr/lib/x86_64-linux-gnu/libsybdb.a /usr/lib/

# POSTGRESQL extension
RUN apt-get update -y
RUN apt-get install -y libpq-dev
RUN docker-php-ext-install pdo pdo_pgsql

RUN mkdir -p /code
ENV HOME=/code
WORKDIR $HOME

USER root
COPY ./ $HOME

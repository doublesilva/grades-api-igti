#!/bin/sh

# --batch to prevent interactive  command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
--output ./config/.env.dev ./config/.env.dev.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
--output ./config/.env.prod ./config/.env.prod.gpg
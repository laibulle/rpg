#!/bin/bash

set -e

# expo login
# export DELIVER_USERNAME=xxxxxx
# export DELIVER_PASSWORD=xxxxxxx
# export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=xxxxxxx

cd assets/

expo publish --release-channel production --non-interactive

# Start building standalone android build using `production` release channel
#expo build:android --release-channel production --non-interactive --no-publish

# Download the built android binary
#curl -o app.apk "$(expo url:apk --non-interactive)"

# Use fastlane to upload your current standalone android build
# Customize this to fit your needs. Take note of env variables. 
# Check out https://docs.fastlane.tools for more info.
#fastlane supply --track 'production' --json_key '<path/to/json_key.json>' --package_name "<your-package-name>" --apk "app.apk" --skip_upload_metadata --skip_upload_images --skip_upload_screenshots


# Start building standalone android build using `production` release channel
expo build:ios --release-channel production --non-interactive --no-publish

# Download the artifact to current directory as `app.ipa`
curl -o app.ipa "$(expo url:ipa --non-interactive)"
# [Optional] See comment above this code snippet to decide
# if you would like to follow this route.

# Use fastlane to upload your current standalone iOS build to test flight on iTunes Connect.
fastlane deliver --ipa "app.ipa" --skip_screenshots --skip_metadata
#!/usr/bin/env bash

# This script deletes openstack images which have the same name,
# keeping only the most recent one.

function get_dup_images () {
    # since uniq prefixes with spaces, the sed step cleans that up

    openstack image list -f value | awk '{print $2}' | sort | uniq -c | \
    sed 's/^ *\([0-9]*\) /\1 /' | \
    grep -v ^1 | awk '{print $2}'
}

function delete_all_but_latest_image () {
    # we explicity specify columns so that we know that last one is Name
    # so that it is safe to use grep $image_name$

    openstack image list -f value -c ID -c Name | \
    grep "$1$" | awk '{print $1}' | \
    xargs -I % bash -c 'echo % `openstack image show -f value -c created_at -c ID %`' | \
    sort -k2 --reverse | tail -n +2 | awk '{print $1}' | \
    # xargs -I % bash -c 'echo "Gonna delete image %"'
    xargs -I % bash -c 'openstack image delete % && echo "Deleted image %"'
}

for image in `get_dup_images`; do
    delete_all_but_latest_image $image
done
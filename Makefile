deploy: packer_web terraform_production_apply

terraform_production_apply:
	cd support/terraform && . ./../../openrc.sh && terraform apply -auto-approve

clean:
	rm -rf packer/files/rpg.zip

packer_web:
	cd support/packer && . ./../../openrc.sh && packer build packer-rpg-web-ovh.json

terraform_apply:
	cd support/terraform && . ./../../openrc.sh && terraform apply -auto-approve

terraform_destroy:
	cd support/terraform && . ./../../openrc.sh && terraform destroy -auto-approve

terraform_plan:
	cd support/terraform && . ./../../openrc.sh && terraform plan

remove_old_images:
	. ./openrc.sh && ./clean_images.sh

remove_all_images:
	cd packer && . ./../openrc.sh && openstack image list -f json | jq -r '.[] | select(.Name == "trenr-web-production") | .ID' | xargs openstack image delete

fetch_locally:
	cp ../trenr/_build/prod/rel/trenr.zip packer/files/trenr.zip

web_production_full: web fetch_locally packer_web terraform_production_apply

web:
	cd ../trenr && make build_docker

web_production_local_full: build_local fetch_locally packer_web terraform_production_apply


build_local:
	cd assets && yarn install && yarn deploy
	MIX_ENV=prod mix phx.digest
	MIX_ENV=prod mix release
	cd _build/prod/rel && zip -r rpg.zip ./*
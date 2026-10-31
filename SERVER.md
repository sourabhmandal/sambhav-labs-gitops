## Deploy the Backend Server

### Steps to Deploy Campusbook Backend Server to EC2 Instance

1. Install Docker, Docker Compose and AWS CLI
2. Get Aws Secrets

3. Login to Github Container Registery (Save Github PAT token)

```bash
echo "ghp_XXXXXXX" | docker login ghcr.io \
  -u sourabhmandal \
  --password-stdin
```

4. Run Campusbook Backend

```bash
aws secretsmanager get-secret-value \
  --secret-id prod/campusbook \
  --region us-east-1 \
  --query 'SecretString' \
  --output text \
  | jq -r 'to_entries[] | "\(.key)=\(.value | tostring)"' > campusbook-be/.env

docker compose -f campusbook-be/docker-compose.prod.yml up -d
```

5. Run Zitadel

```bash
aws secretsmanager get-secret-value \
  --secret-id prod/sambhav-zitadel \
  --region us-east-1 \
  --query 'SecretString' \
  --output text \
  | jq -r 'to_entries[] | "\(.key)=\(.value | tostring)"' > zitadel-auth/.env

docker compose -f zitadel-auth/docker-compose.yml up zitadel-api zitadel-login redis4zitadel -d
```

6. Run Signoz

```bash
docker compose -f signoz-monitoring/docker-compose.yml up -d
```

7. Run Traefik

```bash
aws secretsmanager get-secret-value \
  --secret-id prod/traefik \
  --region us-east-1 \
  --query 'SecretString' \
  --output text \
  | jq -r 'to_entries[] | "\(.key)=\(.value | tostring)"' > traefik-proxy/.env

docker compose -f traefik-proxy/docker-compose.yml up -d
```
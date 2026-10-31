
# Dockerfile
FROM quay.io/keycloak/keycloak:26.8.1 AS builder

ENV KC_DB=postgres
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=preview

WORKDIR /opt/keycloak

RUN /opt/keycloak/bin/kc.sh build

# Runtime image
FROM quay.io/keycloak/keycloak:26.8.1

COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

CMD ["start", "--optimized"]

# CoWork-Flex 🏢

Système de gestion de réservation d'espaces de coworking.

## Lancer le backend
```bash
cd backend/backend
.\mvnw.cmd spring-boot:run
```

## Lancer le frontend
```bash
cd frontend
npm run dev
```

## URLs importantes
- Application : http://localhost:5173
- Swagger UI : http://localhost:8080/swagger-ui/index.html
- H2 Console : http://localhost:8080/h2-console (URL: jdbc:h2:mem:coworkflex / user: sa / pass: vide)

## Fonctionnalités
- Liste et filtrage des espaces de coworking
- Réservation de postes avec vérification anti-chevauchement
- Annulation (uniquement si +24h avant le début)
- Historique des réservations par utilisateur
- 3 tests unitaires sur la logique métier
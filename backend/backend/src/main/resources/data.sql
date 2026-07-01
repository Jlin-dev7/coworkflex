INSERT INTO spaces (name, city, capacity, address, description, image_url) VALUES
('WeWork Nation', 'Paris', 50, '10 Rue de la Paix, Paris', 'Espace moderne au coeur de Paris', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500'),
('StartupHub', 'Lyon', 30, '5 Place Bellecour, Lyon', 'Espace créatif et dynamique', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500'),
('TechSpace', 'Marseille', 40, '15 Rue Canebière, Marseille', 'Espace high-tech pour développeurs', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500'),
('InnoLab', 'Bordeaux', 25, '3 Place de la Bourse, Bordeaux', 'Lab d innovation et créativité', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500');

INSERT INTO desks (label, type, available, space_id) VALUES
('Bureau A1', 'OPEN_SPACE', true, 1),
('Bureau A2', 'OPEN_SPACE', true, 1),
('Salle Réunion 1', 'MEETING_ROOM', true, 1),
('Bureau Privé 1', 'PRIVATE_OFFICE', true, 1),
('Bureau B1', 'OPEN_SPACE', true, 2),
('Bureau B2', 'OPEN_SPACE', true, 2),
('Salle Réunion 2', 'MEETING_ROOM', true, 2),
('Bureau C1', 'OPEN_SPACE', true, 3),
('Bureau Privé 2', 'PRIVATE_OFFICE', true, 3),
('Bureau D1', 'OPEN_SPACE', true, 4);
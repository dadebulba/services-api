-- Create the service table
CREATE TABLE if not exists service (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    description text,
    created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

-- Create the version table
CREATE TABLE if not exists "version" (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    description TEXT,
    created_at timestamp not null default now(),
	updated_at timestamp not null default now(),
    service_id INTEGER NOT NULL,
    FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE
);

-- Insert data into the service table
INSERT INTO service (name, description) VALUES
('Service 1', 'Description of Service 1'),
('Service 2', 'Description of Service 2'),
('Service 3', 'Description of Service 3'),
('Service 4', 'Description of Service 4'),
('Service 5', 'Description of Service 5'),
('Service 6', 'Description of Service 6'),
('Service 7', 'Description of Service 7'),
('Service 8', 'Description of Service 8'),
('Service 9', 'Description of Service 9'),
('Service 10', 'Description of Service 10'),
('Service 11', 'Description of Service 11'),
('Service 12', 'Description of Service 12'),
('Service 13', 'Description of Service 13'),
('Service 14', 'Description of Service 14'),
('Service 15', 'Description of Service 15'),
('Service 16', 'Description of Service 16'),
('Service 17', 'Description of Service 17'),
('Service 18', 'Description of Service 18'),
('Service 19', 'Description of Service 19'),
('Service 20', 'Description of Service 20'),
('Service 21', 'Description of Service 21'),
('Service 22', 'Description of Service 22'),
('Service 23', 'Description of Service 23'),
('Service 24', 'Description of Service 24'),
('Service 25', 'Description of Service 25'),
('Service 26', 'Description of Service 26'),
('Service 27', 'Description of Service 27'),
('Service 28', 'Description of Service 28'),
('Service 29', 'Description of Service 29'),
('Service 30', 'Description of Service 30'),
('Service 31', 'Description of Service 31'),
('Service 32', 'Description of Service 32'),
('Service 33', 'Description of Service 33'),
('Service 34', 'Description of Service 34'),
('Service 35', 'Description of Service 35'),
('Service 36', 'Description of Service 36'),
('Service 37', 'Description of Service 37'),
('Service 38', 'Description of Service 38'),
('Service 39', 'Description of Service 39'),
('Service 40', 'Description of Service 40'),
('Service 41', 'Description of Service 41'),
('Service 42', 'Description of Service 42'),
('Service 43', 'Description of Service 43'),
('Service 44', 'Description of Service 44'),
('Service 45', 'Description of Service 45'),
('Service 46', 'Description of Service 46'),
('Service 47', 'Description of Service 47'),
('Service 48', 'Description of Service 48'),
('Service 49', 'Description of Service 49'),
('Service 50', 'Description of Service 50');

-- Insert data into the version table
INSERT INTO version ("name", description, service_id) VALUES
('Version 1.0', 'Initial release of Service 1', 1),
('Version 1.1', 'Minor update of Service 1', 1),
('Version 2.0', 'Major update of Service 1', 1),
('Version 1.0', 'Initial release of Service 2', 2),
('Version 1.1', 'Minor update of Service 2', 2),
('Version 2.0', 'Major update of Service 2', 2),
('Version 1.0', 'Initial release of Service 3', 3),
('Version 1.1', 'Minor update of Service 3', 3),
('Version 2.0', 'Major update of Service 3', 3),
('Version 1.0', 'Initial release of Service 4', 4),
('Version 1.1', 'Minor update of Service 4', 4),
('Version 2.0', 'Major update of Service 4', 4),
('Version 1.0', 'Initial release of Service 5', 5),
('Version 1.1', 'Minor update of Service 5', 5),
('Version 2.0', 'Major update of Service 5', 5),
('Version 1.0', 'Initial release of Service 6', 6),
('Version 1.1', 'Minor update of Service 6', 6),
('Version 2.0', 'Major update of Service 6', 6),
('Version 1.0', 'Initial release of Service 7', 7),
('Version 1.1', 'Minor update of Service 7', 7),
('Version 2.0', 'Major update of Service 7', 7),
('Version 1.0', 'Initial release of Service 8', 8),
('Version 1.1', 'Minor update of Service 8', 8),
('Version 2.0', 'Major update of Service 8', 8),
('Version 1.0', 'Initial release of Service 9', 9),
('Version 1.1', 'Minor update of Service 9', 9),
('Version 2.0', 'Major update of Service 9', 9),
('Version 1.0', 'Initial release of Service 10', 10),
('Version 1.1', 'Minor update of Service 10', 10),
('Version 2.0', 'Major update of Service 10', 10),
('Version 1.0', 'Initial release of Service 11', 11),
('Version 1.1', 'Minor update of Service 11', 11),
('Version 2.0', 'Major update of Service 11', 11),
('Version 1.0', 'Initial release of Service 12', 12),
('Version 1.1', 'Minor update of Service 12', 12),
('Version 2.0', 'Major update of Service 12', 12),
('Version 1.0', 'Initial release of Service 13', 13),
('Version 1.1', 'Minor update of Service 13', 13),
('Version 2.0', 'Major update of Service 13', 13),
('Version 1.0', 'Initial release of Service 14', 14),
('Version 1.1', 'Minor update of Service 14', 14),
('Version 2.0', 'Major update of Service 14', 14),
('Version 1.0', 'Initial release of Service 15', 15),
('Version 1.1', 'Minor update of Service 15', 15),
('Version 2.0', 'Major update of Service 15', 15),
('Version 1.0', 'Initial release of Service 16', 16),
('Version 1.1', 'Minor update of Service 16', 16),
('Version 2.0', 'Major update of Service 16', 16),
('Version 1.0', 'Initial release of Service 17', 17),
('Version 1.1', 'Minor update of Service 17', 17),
('Version 2.0', 'Major update of Service 17', 17),
('Version 1.0', 'Initial release of Service 18', 18),
('Version 1.1', 'Minor update of Service 18', 18),
('Version 2.0', 'Major update of Service 18', 18),
('Version 1.0', 'Initial release of Service 19', 19),
('Version 1.1', 'Minor update of Service 19', 19),
('Version 2.0', 'Major update of Service 19', 19),
('Version 1.0', 'Initial release of Service 20', 20),
('Version 1.1', 'Minor update of Service 20', 20),
('Version 2.0', 'Major update of Service 20', 20),
('Version 1.0', 'Initial release of Service 21', 21),
('Version 1.1', 'Minor update of Service 21', 21),
('Version 2.0', 'Major update of Service 21', 21),
('Version 1.0', 'Initial release of Service 22', 22),
('Version 1.1', 'Minor update of Service 22', 22),
('Version 2.0', 'Major update of Service 22', 22),
('Version 1.0', 'Initial release of Service 23', 23),
('Version 1.1', 'Minor update of Service 23', 23),
('Version 2.0', 'Major update of Service 23', 23),
('Version 1.0', 'Initial release of Service 24', 24),
('Version 1.1', 'Minor update of Service 24', 24),
('Version 2.0', 'Major update of Service 24', 24)
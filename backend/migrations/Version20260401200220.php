<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260401200220 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE itinerary_day (id INT AUTO_INCREMENT NOT NULL, day_number INT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, trip_id INT DEFAULT NULL, INDEX IDX_AB0E6494A5BC2E0E (trip_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE itinerary_day ADD CONSTRAINT FK_AB0E6494A5BC2E0E FOREIGN KEY (trip_id) REFERENCES trips (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE itinerary_day DROP FOREIGN KEY FK_AB0E6494A5BC2E0E');
        $this->addSql('DROP TABLE itinerary_day');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260401200642 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE itinerary_activity (id INT AUTO_INCREMENT NOT NULL, time VARCHAR(10) DEFAULT NULL, title VARCHAR(255) NOT NULL, detail VARCHAR(255) DEFAULT NULL, type VARCHAR(50) NOT NULL, sort_order INT DEFAULT NULL, day_id INT DEFAULT NULL, INDEX IDX_8D963D9B9C24126 (day_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE itinerary_activity ADD CONSTRAINT FK_8D963D9B9C24126 FOREIGN KEY (day_id) REFERENCES itinerary_day (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE itinerary_activity DROP FOREIGN KEY FK_8D963D9B9C24126');
        $this->addSql('DROP TABLE itinerary_activity');
    }
}

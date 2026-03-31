<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260331232201 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE trip_image (id INT AUTO_INCREMENT NOT NULL, image_url VARCHAR(255) NOT NULL, is_cover TINYINT NOT NULL, sort_order INT DEFAULT NULL, trip_id INT DEFAULT NULL, INDEX IDX_1F76841CA5BC2E0E (trip_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE trip_image ADD CONSTRAINT FK_1F76841CA5BC2E0E FOREIGN KEY (trip_id) REFERENCES trips (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trip_image DROP FOREIGN KEY FK_1F76841CA5BC2E0E');
        $this->addSql('DROP TABLE trip_image');
    }
}

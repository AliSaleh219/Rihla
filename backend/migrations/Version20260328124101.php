<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260328124101 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE rating (id INT AUTO_INCREMENT NOT NULL, rate INT NOT NULL, trips_id INT DEFAULT NULL, INDEX IDX_D88926226C2C0C (trips_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE trips (id INT AUTO_INCREMENT NOT NULL, tilte VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, governorate_id INT DEFAULT NULL, INDEX IDX_AA7370DAB5FFB04E (governorate_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE rating ADD CONSTRAINT FK_D88926226C2C0C FOREIGN KEY (trips_id) REFERENCES trips (id)');
        $this->addSql('ALTER TABLE trips ADD CONSTRAINT FK_AA7370DAB5FFB04E FOREIGN KEY (governorate_id) REFERENCES governorates (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rating DROP FOREIGN KEY FK_D88926226C2C0C');
        $this->addSql('ALTER TABLE trips DROP FOREIGN KEY FK_AA7370DAB5FFB04E');
        $this->addSql('DROP TABLE rating');
        $this->addSql('DROP TABLE trips');
    }
}

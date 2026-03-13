<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260310013433 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sites (id INT AUTO_INCREMENT NOT NULL, name_en VARCHAR(255) NOT NULL, name_ar VARCHAR(255) DEFAULT NULL, description LONGTEXT NOT NULL, type VARCHAR(255) NOT NULL, cover_image VARCHAR(255) DEFAULT NULL, latitude NUMERIC(10, 7) NOT NULL, longitude NUMERIC(10, 7) NOT NULL, is_active TINYINT NOT NULL, province_id_id INT DEFAULT NULL, INDEX IDX_BC00AA63D72A0A7A (province_id_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE tags (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, icon VARCHAR(255) DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE sites ADD CONSTRAINT FK_BC00AA63D72A0A7A FOREIGN KEY (province_id_id) REFERENCES provinces (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sites DROP FOREIGN KEY FK_BC00AA63D72A0A7A');
        $this->addSql('DROP TABLE sites');
        $this->addSql('DROP TABLE tags');
    }
}

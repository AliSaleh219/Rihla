<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260624091637 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE organizer_request (id INT AUTO_INCREMENT NOT NULL, bio LONGTEXT NOT NULL, experience LONGTEXT NOT NULL, cv_path VARCHAR(255) DEFAULT NULL, status VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL, user_id INT NOT NULL, INDEX IDX_72A63856A76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE organizer_request ADD CONSTRAINT FK_72A63856A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trips CHANGE average_rating average_rating NUMERIC(3, 1) DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE organizer_request DROP FOREIGN KEY FK_72A63856A76ED395');
        $this->addSql('DROP TABLE organizer_request');
        $this->addSql('ALTER TABLE trips CHANGE average_rating average_rating NUMERIC(3, 1) DEFAULT \'0.0\' NOT NULL');
    }
}

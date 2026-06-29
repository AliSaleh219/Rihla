<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260629091939 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trips ADD created_at DATETIME NULL DEFAULT NULL, CHANGE average_rating average_rating NUMERIC(3, 1) DEFAULT 0 NOT NULL');
    
    // صلح البيانات القديمة
    $this->addSql("UPDATE trips SET created_at = NOW() WHERE created_at IS NULL");
    
    // هلق خليها NOT NULL
    $this->addSql('ALTER TABLE trips CHANGE created_at created_at DATETIME NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trips DROP created_at, CHANGE average_rating average_rating NUMERIC(3, 1) DEFAULT \'0.0\' NOT NULL');
    }
}

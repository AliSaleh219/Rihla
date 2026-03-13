<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260216195005 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE places ADD description LONGTEXT NOT NULL, ADD category VARCHAR(255) NOT NULL, ADD latitude NUMERIC(10, 6) NOT NULL, ADD longitude NUMERIC(10, 6) NOT NULL, ADD is_beach TINYINT NOT NULL, ADD is_mountain TINYINT NOT NULL, ADD is_waterfall TINYINT NOT NULL, ADD is_historical TINYINT NOT NULL, ADD is_religious TINYINT NOT NULL, ADD is_park TINYINT NOT NULL, ADD is_museum TINYINT NOT NULL, ADD is_family_friendly TINYINT NOT NULL, ADD is_romantic TINYINT NOT NULL,  CHANGE dire image VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE places ADD dire VARCHAR(255) NOT NULL, DROP description, DROP image, DROP category, DROP latitude, DROP longitude, DROP is_beach, DROP is_mountain, DROP is_waterfall, DROP is_historical, DROP is_religious, DROP is_park, DROP is_museum, DROP is_family_friendly, DROP is_romantic');
    }
}

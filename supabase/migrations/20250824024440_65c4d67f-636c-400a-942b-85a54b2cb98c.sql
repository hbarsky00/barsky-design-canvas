-- Clean up outdated project SEO entries from page_metadata table
-- These are being overridden by structured case study data anyway
DELETE FROM page_metadata 
WHERE path IN (
  '/project/investment-app',
  '/project/herbalink', 
  '/project/splittime',
  '/project/eventhub',
  '/project/finvest',
  '/project/careconnect',
  '/project/taskflow',
  '/project/smartlearn'
);
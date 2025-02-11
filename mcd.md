``` mermaid
---
 title: MCD
---
    User ||--o{ Order : has
    User ||--o{ Pass : owns
    Order ||--o{ Pass : contains
    Pass ||--|o Package : belongs_to
    Region ||--o{ Site : manages
    Region ||--o{ Package : offers
    Region ||--o{ SiteCategory : classifies
    Site ||--|o Region : belongs_to
    Site ||--|o SiteCategory : classified_in
    Site ||--o{ Event : hosts
    Site ||--o{ SiteUser : managed_by
    Package ||--o{ SitePackage : contains
    Site ||--o{ SitePackage : linked_to

    User {
        Int id PK
        String name
        String email UNIQUE
        String password
        DateTime createAt
        DateTime updatedAt
    }
    
    Order {
        Int id PK
        Int userId FK UNIQUE
        DateTime date
        Decimal amount
        String status
        DateTime createdAt
        DateTime updatedAt
    }
    
    Pass {
        Int id PK
        String name
        Int packageId FK
        String codePass
        Int orderId FK
        Int userId FK
        Boolean isActive
        DateTime createdAt
        DateTime updatedAt
    }
    
    Region {
        Int id PK
        String email UNIQUE
        String password
        String media
        String description
        String name UNIQUE
        DateTime createAt
        DateTime updatedAt
    }
    
    Site {
        Int id PK
        Int regionId FK
        Int categoryId FK
        String name UNIQUE
        String description
        String city
        String postalCode
        String address
        Decimal latitude
        Decimal longitude
        String media
        String contact
        String information
        DateTime createdAt
        DateTime updatedAt
    }
    
    SiteCategory {
        Int id PK
        Int regionId FK
        String name UNIQUE
        String media
        DateTime created_at
        DateTime updated_at
    }
    
    Event {
        Int id PK
        Int siteId FK
        String name
        String description
        String media
        DateTime startDate
        DateTime endDate
        DateTime createdAt
        DateTime updatedAt
    }
    
    SiteUser {
        Int id PK
        Int siteId FK
        String name UNIQUE
        String email UNIQUE
        String password
    }
    
    Package {
        Int id PK
        Int regionId FK
        String name
        Decimal price
        String description
        String media
    }
    
    SitePackage {
        Int siteId PK FK
        Int packageId PK FK
    }

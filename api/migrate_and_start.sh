until pg_isready -h db -p 5432 -U user; do
  echo "En attente de PSQL..."
  sleep 2
done

npm install
npx prisma generate
npx prisma migrate dev --name init
# Seed the database
npx prisma db seed
npm run dev
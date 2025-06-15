#!/bin/bash

# 🔄 Автоматическая проверка и исправление Tailwind CSS CLI
# Автор: Copilot + Владислав 🤝

echo "🛠️ Проверка и настройка Tailwind CSS CLI..."

# 1️⃣ Проверяем, установлен ли tailwindcss
if ! npm list tailwindcss > /dev/null 2>&1; then
  echo "⚠️ Tailwind CSS не найден. Устанавливаем..."
  npm install -D tailwindcss@latest || { echo "❌ Ошибка установки Tailwind"; exit 1; }
else
  echo "✅ Tailwind CSS найден."
fi

# 2️⃣ Проверяем наличие tailwindcss в node_modules/.bin
if [ ! -f node_modules/.bin/tailwindcss ]; then
  echo "⚠️ CLI-файл отсутствует. Пересобираем..."
  npm rebuild tailwindcss || { echo "❌ Ошибка пересборки Tailwind"; exit 1; }
else
  echo "✅ Tailwind CLI установлен."
fi

# 3️⃣ Очищаем npm кеш и удаляем возможные конфликты
echo "🧹 Очищаем npm кеш..."
npm cache clean --force

# 4️⃣ Удаляем node_modules и переустанавливаем зависимости
echo "🔄 Обновляем зависимости..."
rm -rf node_modules package-lock.json .parcel-cache
npm install

# 5️⃣ Проверяем финальную доступность CLI
if [ -f node_modules/.bin/tailwindcss ]; then
  echo "🎉 Tailwind CLI теперь работает! Запускайте:"
  echo "   npx tailwindcss -i ./src/styles/index.css -o ./src/styles/output.css --watch"
else
  echo "❌ Tailwind CLI всё ещё отсутствует. Попробуйте ручную установку:"
  echo "   npm install -D tailwindcss-cli"
fi
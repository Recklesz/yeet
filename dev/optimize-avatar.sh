#!/bin/bash
set -euo pipefail

TARGET_DIMENSION=512
RELATIVE_PATH="assets/images/avatars/image.png"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INPUT_PATH="${PROJECT_ROOT}/${RELATIVE_PATH}"
BACKUP_PATH="${INPUT_PATH}.bak"

if ! command -v sips >/dev/null 2>&1; then
  echo "Error: sips command is required but not available." >&2
  exit 1
fi

if [ ! -f "${INPUT_PATH}" ]; then
  echo "Error: ${RELATIVE_PATH} not found." >&2
  exit 1
fi

if [ ! -f "${BACKUP_PATH}" ]; then
  cp "${INPUT_PATH}" "${BACKUP_PATH}"
  echo "Created backup at ${BACKUP_PATH}".
else
  echo "Backup already present at ${BACKUP_PATH}".
fi

TMP_FILE="$(mktemp -t avatar-optimize-XXXXXX).png"

sips -s format png -Z "${TARGET_DIMENSION}" "${INPUT_PATH}" --out "${TMP_FILE}" >/dev/null

mv "${TMP_FILE}" "${INPUT_PATH}"

echo "Optimized ${RELATIVE_PATH} to maximum dimension ${TARGET_DIMENSION}px."
ls -lh "${INPUT_PATH}" "${BACKUP_PATH}" | awk '{print $9 ":\t" $5}'

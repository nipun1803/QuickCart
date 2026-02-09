#!/bin/bash

# ===== CONFIG =====
INSTANCE_ID="i-0abf4270d18112e19"

# ===== FETCH STATE =====
STATE=$(aws ec2 describe-instances \
  --instance-ids "$INSTANCE_ID" \
  --query "Reservations[0].Instances[0].State.Name" \
  --output text)

# ===== FETCH HEALTH =====
SYSTEM_STATUS=$(aws ec2 describe-instance-status \
  --instance-ids "$INSTANCE_ID" \
  --query "InstanceStatuses[0].SystemStatus.Status" \
  --output text)

INSTANCE_STATUS=$(aws ec2 describe-instance-status \
  --instance-ids "$INSTANCE_ID" \
  --query "InstanceStatuses[0].InstanceStatus.Status" \
  --output text)

# ===== ANALYSIS =====
HEALTH="[ALERT]"
if [ "$SYSTEM_STATUS" = "ok" ] && [ "$INSTANCE_STATUS" = "ok" ]; then
  HEALTH="[OK]"
fi

# ===== OUTPUT =====
echo "--------------------------------"
echo "Instance ID: $INSTANCE_ID"
echo "State:       $STATE"
echo "System:      $SYSTEM_STATUS"
echo "Instance:    $INSTANCE_STATUS"
echo "Health:      $HEALTH"
echo "--------------------------------"

if [ "$HEALTH" = "[OK]" ]; then
  echo "[OK] System Healthy"
else
  echo "[ALERT] Check System!"
fi

#!/bin/bash

TAG=`cat /data/tag/webim-h5/tag_bak`

echo TAG=$TAG

mkdir -p /root/.ssh
echo "${SSH_KEY}" > /root/.ssh/id_rsa
chmod 600 /root/.ssh/id_rsa


expect <<-EOF
set timeout -1
spawn ssh -p$JUMPSERVER_PORT easemob@$JUMPSERVER_HOST
    expect {
        "(yes/no)?" {
                send "yes\r"
                expect "\~\]" {send "ssh ${ONLINE_HOST}\r"}
            }
        "\~\]" {send "ssh ${ONLINE_HOST}\r"}
    }
    expect "\~"
    send "cd /data/Dockerfile/kubernetes/webim-h5\r"
    send "./update.sh ${TAG}\r"
    send "exit\r"
    expect "\~\]"
    send "exit\r"
    expect eof
EOF

cd /data/tag/webim-h5
echo $TAG > tag_online

echo tag_bak=`cat tag_bak`
echo tag_online=`cat tag_online`

echo "online rollback succeed"
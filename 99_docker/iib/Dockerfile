# © Copyright IBM Corporation 2016.
#
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Public License v1.0
# which accompanies this distribution, and is available at
# http://www.eclipse.org/legal/epl-v10.html

FROM sg248351/iibmq-onpremise
MAINTAINER Carsten Bornert carsten.bornert@uk.ibm.com

ADD test* /home/iibuser/
ADD datasources.json /home/iibuser/datasources.json
ADD iib_msghub_credentials.sh /usr/local/bin/

USER root
RUN chmod +x /usr/local/bin/iib_msghub_credentials.sh
RUN echo "/usr/local/bin/iib_msghub_credentials.sh" >> /etc/iib/iibconfig.sh
RUN chown iibuser:mqbrkrs /home/iibuser/*
RUN chmod +x /home/iibuser/testme.sh
USER iibuser

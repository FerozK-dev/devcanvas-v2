export const getServiceUrl = (servicePrefix) => {
  const currentHost = window.location.hostname; // e.g., app.localhost or app.myservice.com

  if (currentHost === 'frontend.localhost' || currentHost.endsWith('.localhost')) {
    return `https://${servicePrefix}.localhost`;
  }

  // Production (app.devcanvas.live -> backend.devcanvas.live)
  const serviceHost = currentHost.replace(/^app\./, `${servicePrefix}.`);
  return `https://${serviceHost}`;
};

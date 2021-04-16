const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    //const response = await Promise.race[(timeout(2), fetch(url))];
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(response.statusText);
    return data;
  } catch (err) {
    throw err;
  }
};

export const postJSON = async function (url, data) {
  try {
    const post = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('here is the helper working');
    const response = await post.json();
    return response;
  } catch (err) {
    console.log('My error', err);
  }
};

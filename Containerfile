FROM docker.io/oven/bun:latest

# Copy the lock and package file
COPY bun.lockb . 
COPY package.json . 

# Install dependencies
RUN bun install --frozen-lockfile

# Copy your source code
# If only files in the src folder changed, this is the only step that gets executed!
ENV NODE_ENV=production
COPY . . 

EXPOSE 2030
CMD ["bun", "run", "start"]

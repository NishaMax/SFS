insert into storage.buckets (id, name, public) values ('sfs-images', 'sfs-images', true);

-- Allow public read access
create policy "Public Access" on storage.objects for select using ( bucket_id = 'sfs-images' );

-- Allow authenticated users to upload files
create policy "Auth Insert" on storage.objects for insert with check ( bucket_id = 'sfs-images' and auth.role() = 'authenticated' );

-- Allow authenticated users to update files
create policy "Auth Update" on storage.objects for update using ( bucket_id = 'sfs-images' and auth.role() = 'authenticated' );

-- Allow authenticated users to delete files
create policy "Auth Delete" on storage.objects for delete using ( bucket_id = 'sfs-images' and auth.role() = 'authenticated' );
